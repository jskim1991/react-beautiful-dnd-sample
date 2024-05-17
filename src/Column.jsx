import classes from "./Column.module.css";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import classNames from "classnames";

const Column = ({ column, tasks }) => {
  return (
    <div className={classes.container}>
      <h1>{column.title}</h1>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={classNames(classes.list, {
              [classes.draggingOver]: snapshot.isDraggingOver,
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, idx) => (
              <Task key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
