import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";

import { differenceInSeconds } from "date-fns";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { createContext, useEffect, useState } from "react";
import NewCycleForm from "./NewCycleForm";
import { Countdown } from "./Countdown";



interface Cycle {
  id: string;
  task: string;
  minutsAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

export function Home() {
  const [cycles, setCyles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCyles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          };
        } else {
          return cycle;
        }
      })
    );
  }

  // function handleCreatNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutsAmount: data.minutsAmount,
  //     startDate: new Date(),
  //   };

  //   setCyles((state) => [...state, newCycle]);
  //   setActiveCycleId(newCycle.id);
  //   setAmountSecondsPassed(0);

  //   reset();
  // }

  function handleInterruptCycle() {
    setCyles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);

    document.title = `Ignite Timer`;
  }

  

  // const task = watch("task");
  // const isSubmitDisabled = !task;

  console.log(cycles);

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreatNewCycle)}*/ action="">
        <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
          {/* <NewCycleForm/> */}
          <Countdown />
        </CycleContext.Provider>
        

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" /*disabled={isSubmitDisabled}*/>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
