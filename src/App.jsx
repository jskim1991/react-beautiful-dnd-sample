import { useState } from "react";
import { initialData } from "./data";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

import classes from "./App.module.css";

const App = () => {
  const [state, setState] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = `background-color 0.2s ease`;
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity}`;
  };

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;
    if (!destination) {
      // user dropped outside
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // same position
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      // within same column
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [updatedColumn.id]: updatedColumn,
        },
      });
      return;
    } else {
      // across different columns
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      });
    }
  };

  return (
    <div className={classes.container}>
      <DragDropContext
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => {
            return state.tasks[taskId];
          });

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default App;
