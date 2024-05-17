Example Result
```javascript
const result = {
    draggableId: 'task-1',
    type: 'TYPE',
    reason: 'DROP',
    source: {
        droppableId: 'column-1',
        index: 0
    },
    destination: {
        droppableId: 'column-1',
        index: 1
    }
}
```

Snapshot
```javascript
const draggableSnapshot = {
    isDragging: true,
    draggingOver: 'column-1'
}

const droppableSnapshot = {
    isDraggingOver: true,
    draggingOverWith: 'task-1'
}
```

DragDropContext Callbacks
```javascript
// onDragStart
const start = {
    draggableId: 'task-1',
    type: 'TYPE',
    source: {
        droppableId: 'column-1',
        index: 0
    }
}

// onDragUpdate
const update = {
    ...start,
    destination: {
        droppableId: 'column-1',
        index: 1
    }
}

// onDragEnd
const result = {
    ...update,
    reason: 'DROP'
}
```