import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "..";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutsAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const differece = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (differece >= totalSeconds) {
          markCurrentCycleAsFinished();

          setSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setSecondsPassed(differece);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  //console.log(formState.errors);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Pomodoro`;
      return;
    }
  }, [minutes, seconds]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
