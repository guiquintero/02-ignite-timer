import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CycleContext);
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      {/* <pre>{JSON.stringify(cycles, null, 2)}</pre> */}
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutsAmount} minutos</td>
                <td>{cycle.startDate.toISOString()}</td>
                <td>
                  {cycle.finishedDate && (
                    <Status statuscolor="green">Concluido</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statuscolor="red">Interrompido</Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statuscolor="yellow">Em Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
