// GROUP LIST
{
    const { groups } = this.props.board
    return (
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId="groups" direction="horizontal" >
                {(provided) => (
                    <div className="group-container"  {...provided.droppableProps} ref={provided.innerRef}>
                        {groups && groups.map((group, idx) => {
                            console.log('the group', group);
                            return (
                                <Draggable key={group.id} draggableId={group.id} index={idx}>
                                    {(provided) => (
                                        <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <GroupPreview group={group} idx={group.id} />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        <div >
                            <form action="">
                                <input type="text" placeholder="+ Add another list" value={this.state.group.title} onClick={this.onShowAddBtn} onChange={this.handleChange} style={{ marginTop: '30px' }} />
                                {this.state.isAdding && <button onClick={this.onAddGroup}>Add List</button>}
                            </form>
                        </div>
                        {/* {provided.placeholder} */}
                    </div>

                )}
            </Droppable>
        </DragDropContext>
    )
} 


// GROUP PREVIEW 
{
    const { group, board, isLabelOpen, openLabel, updateCardsLocation } = this.props
    const { cards } = group
    const { isAdding } = this.state
    const { title } = this.state.card
    return (
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId={group.id} type="CARD">
                {(provided) => (
                    <div className="group-preview" {...provided.droppableProps} ref={provided.innerRef}   >
                        <h3>{group.title}</h3>
                        <CardList cards={cards} board={board} updateCardsLocation={updateCardsLocation} isLabelOpen={isLabelOpen} openLabel={openLabel} currGroup={group} />
                        {provided.placeholder}
                        <form action="">
                            <input onClick={this.onShowAddBtn} value={title} type="text" placeholder="+ Add another card " onChange={this.handleChange} />
                            {isAdding && <button onClick={this.onAddCard}> Add Card</button>}
                        </form>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}


// CARD LIST 
{
            const { board, isLabelOpen, openLabel, currGroup } = this.props
            // const { cards } = this.props
            const { cards } = this.state
            return (
                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <Droppable droppableId={currGroup.id} type="CARD" >
                        {(provided) => (
                            <div className="card-list" {...provided.droppableProps} ref={provided.innerRef}  >
                                {cards.map((card, idx) => {
                                    return (
                                        <Draggable key={card.id} draggableId={card.id} index={idx}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <CardPreview board={board} idx={card.id} card={card} isLabelOpen={isLabelOpen} openLabel={openLabel} />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )
        }
    