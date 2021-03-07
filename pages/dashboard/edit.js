import React from 'react';
import { useEffect, useState } from "react";

import {DndContext} from '@dnd-kit/core';
import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('../../components/dashboardLayout'))
const Droppable = dynamic(() => import('../../components/Droppable'))
const Draggable  = dynamic(() => import('../../components/Draggable'))


export default function Edit() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
<DashboardLayout>
<DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : 'Drop here'}
        </Droppable>
      ))}
    </DndContext>
    </DashboardLayout>


  );

  function handleDragEnd(event) {
    const {over} = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};