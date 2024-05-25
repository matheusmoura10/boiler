import { injectable } from "inversify";

@injectable()
export default abstract class UseCase<I, O> {
  constructor() {}

  abstract execute(input: I): Promise<O>;
}
