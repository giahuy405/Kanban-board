import React, { useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
const Kanban = () => {
    // REMEMBER TO MOVE STRICT MODE !!!!!!!!!!!!!!!!!
    const [state, setState] = useState({
        toDo: {
            id: 'toDo',
            items: [
                { id: '1', taskName: 'Task 1' },
                { id: '2', taskName: 'Task 2' },
                { id: '3', taskName: 'Task 3' },
            ]
        },
        inProgress: {
            id: 'inProgress',
            items: [
                { id: '4', taskName: 'Task 4' },
                { id: '5', taskName: 'Task 5' },
                { id: '6', taskName: 'Task 6' },
            ]
        },
        done: {
            id: 'done',
            items: [
                { id: '7', taskName: 'Task 7' },
                { id: '8', taskName: 'Task 8' },
                { id: '9', taskName: 'Task 9' },
            ]
        }
    })
    const handleDragEnd = (result) => {
        let { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }

        //tạo ra 1 tag drag
        let itemCopy = { ...state[source.droppableId].items[source.index] };
        console.log('itemCopy', itemCopy)

        //Droppable bắt đầu kéo
        let index = state[source.droppableId].items.findIndex(item => item.id == itemCopy.id);

        state[source.droppableId].items.splice(index, 1);

        //Droppable thả vào
        let dropDestination = state[destination.droppableId].items;

        dropDestination.splice(destination.index, 0, itemCopy)


        setState(state);
    }
    return (
        <div className='h-screen bg-blue-100'>
            <div className="max-w-[600px] mx-auto pt-5">
                <h3 className="text-center text-3xl mb-10">DEMO KANBAN</h3>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="flex  justify-around">
                        {_.map(state, (statusTask, index) =>
                            <Droppable droppableId={statusTask.id} key={index}>
                                {(provided) => {
                                    return <div
                                        key={index}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="bg-blue-500 h-48 overflow-auto p-1 min-w-[160px] duration-500" >
                                        <h3 className="text-white">{statusTask.id}</h3>
                                        {statusTask.items.map((item, index) => {
                                            return <Draggable key={item.id} index={index} draggableId={item.id}>
                                                {(provided) => {
                                                    return <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="mt-1 py-2 px-14 bg-white text-center">
                                                        {item.taskName}
                                                    </div>
                                                }}
                                            </Draggable>
                                        })}
                                        {/* nơi hiển thị chỗ trống khi task dc lấy đi */}
                                        {provided.placeholder}
                                    </div>
                                }}
                            </Droppable>)}
                    </div>
                </DragDropContext>
            </div>
        </div>
    )
}

export default Kanban