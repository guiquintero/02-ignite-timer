import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutsAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="De um nome para seu projeto"
						list="task_suggestions"
          />

					<datalist id="task_suggestions">
						<option value="Projeto 1"/>
						<option value="Projeto 2"/>
						<option value="Projeto 3"/>
					</datalist>

          <label htmlFor="minutsAmount">durante</label>
          <MinutsAmountInput
            type="number"
            id="minutsAmount"
            placeholder="00"
            step={5}
						min={5}
						max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
