import type { MaybePromise } from '@unicornify/utils';
import OpenAI from 'openai';

export type CreateChatOptions<T> = {
  prompt: OpenAI.ChatCompletionMessageParam[];
  model?: OpenAI.Chat.ChatCompletionCreateParams['model'];
  parse: (response: string, retry: (message: string) => Promise<T>) => MaybePromise<T>;
  attempts: number;
};
export function createChatService(openai: OpenAI) {
  function extractResponse(completion: OpenAI.Chat.ChatCompletion) {
    const response = completion.choices[0]!.message?.content;
    if (!response) throw Error('No response received from OpenAI');
    return response;
  }

  async function createChat<T>({
    prompt,
    parse,
    attempts,
    model = 'gpt-3.5-turbo',
  }: CreateChatOptions<T>): Promise<T> {
    const completion = await openai.chat.completions.create({
      model,
      messages: prompt,
      temperature: 0.6,
    });
    const response = extractResponse(completion);
    prompt.push({ role: 'assistant', content: response });
    return parse(response, (message) => {
      if (attempts <= 0) {
        throw new Error('Unable to generate a valid response');
      }
      prompt.push({
        role: 'user',
        content: message,
      });
      return createChat({ prompt, parse, attempts: attempts - 1 });
    });
  }

  return {
    createChat,
  };
}
