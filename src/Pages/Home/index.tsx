import { Play } from "phosphor-react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutsAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";
import { useState } from "react";

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

interface Cycle {
  id: string;
  task: string;
  minutsAmount: number;
}

export function Home() {
  const [cycles, setCyles] = useState<Cycle[]>([]);

  const[activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const[amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset /*formState*/ } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationShema),
    defaultValues: {
      task: "",
      minutsAmount: 0,
    }
  });

  function handleCreatNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutsAmount: data.minutsAmount,
    };

    setCyles((state)=>[...state, newCycle]);
    setActiveCycleId(newCycle.id);
    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutsAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  //console.log(formState.errors);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="De um nome para seu projeto"
            list="task_suggestions"
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
            {...register("minutsAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
