import { addCommandConfigure, addCommandGenerate, createProgram } from './cli';

export async function run(): Promise<void> {
  const program = createProgram();
  addCommandGenerate(program);
  addCommandConfigure(program);

  await program.parseAsync(process.argv);
}

run();
