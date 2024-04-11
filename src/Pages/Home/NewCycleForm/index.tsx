import { FormContainer, MinutsAmountInput, TaskInput } from "./style";
import { useContext } from "react";
import { CycleContext } from "..";
import { useFormContext } from "react-hook-form";



export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext();
  
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
