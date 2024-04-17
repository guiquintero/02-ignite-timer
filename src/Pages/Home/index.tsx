import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useContext } from "react";
import NewCycleForm from "./NewCycleForm";
import { Countdown } from "./Countdown";
import { CycleContext } from "../../contexts/CyclesContext";

const newCycleFormValidationShema = zod.object({
  task: zod.string().min(1, "Informe o nome da tarefa"),
  minutsAmount: zod
    .number()
    .min(5, "Informe um valor entre 5 e 60")
    .max(60, "Informe um valor entre 5 e 60"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationShema>;

export function Home() {
  const {activeCycle, creatNewCycle, interruptCurrentCycle} = useContext(CycleContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationShema),
    defaultValues: {
      task: "",
      minutsAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreatNewCycle(data: NewCycleFormData){
    creatNewCycle(data);
    reset();
  }
  

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)} action="">

          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
