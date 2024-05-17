import classes from "./Task.module.css";
import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import Handle from "./Handle";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={false}>
      {(provided, snapshot) => (
        <div
          className={classNames(classes.container, {
            [classes.dragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Handle />
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
