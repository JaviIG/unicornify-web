import { type UnicornifyWebDb } from './middleware/00.container.middleware';
import { createMailService } from './services/mail.service';

export interface ContainerValues {
  mailService: ReturnType<typeof createMailService>;
  db: UnicornifyWebDb;
}
