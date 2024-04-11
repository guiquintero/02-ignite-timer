import { useForm } from "react-hook-form";
import { FormContainer, MinutsAmountInput, TaskInput } from "./style";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const newCycleFormValidationShema = zod.object({
  task: zod.string().min(1, "Informe o nome da tarefa"),
  minutsAmount: zod
    .number()
    .min(5, "Informe um valor entre 5 e 60")
    .max(60, "Informe um valor entre 5 e 60"),
});

// interface NewCycleFormData {
//   task: string;
//   minutsAmount: number;
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationShema>;

export function NewCycleForm() {

  const { register, handleSubmit, watch, reset /*formState*/ } =
  useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationShema),
    defaultValues: {
      task: "",
      minutsAmount: 0,
    },
  });
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="De um nome para seu projeto"
        list="task_suggestions"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task_suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutsAmount">durante</label>
      <MinutsAmountInput
        type="number"
        id="minutsAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutsAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}

export default NewCycleForm;
