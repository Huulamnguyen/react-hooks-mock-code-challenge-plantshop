import React, {useState} from "react";

function PlantCard({plant, onDeletePlant}) {
  const {id, name, image, price} = plant

  const [isStocked, setIsStocked] = useState(true)
  const [wantUpdatePrice, setWantUpdatePrice] = useState(false)
  const [priceToEdit, setPriceToEdit] = useState(price)

  const [done, setDone] = useState(false)

  // ** Toggle in Stock or out of stock
  function handleStockBtn(){
    setIsStocked(!isStocked)
  }

  // ** Handle Delete
  function handleDelete(){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    onDeletePlant(id)
  }

  // ** Toggle to show edit price form or hide
  function toggleUpdatePriceBtn(){
    setWantUpdatePrice(!wantUpdatePrice)
  }

  function editPrice(e){
    e.preventDefault()
    console.log(e.target.value)
    setPriceToEdit(e.target.value)
  }

  function handleEditPrice(e){
    e.preventDefault()
    console.log("plant", id)
    fetch(`http://localhost:6001/plants/${id}`, {
      method:"PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ price : parseFloat(priceToEdit) })
    })
    .then(r=>r.json())
    .then(data => console.log(data))
  }

  function handleDone(){
    setDone(!done)
  }

  const updatePriceForm = <form onSubmit={handleEditPrice}>
                            <input onChange={editPrice} type="number" step="0.01" name="price" placeholder={price} value={priceToEdit}/>
                            {done ? <button onClick={handleDone} type="submit">Edited</button> : <button className="danger" onClick={handleDone} type="submit">Edit</button>}
                          </form>

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {priceToEdit}</p>

      {/* Show/Hide Edit Price Form */}
      {wantUpdatePrice ? updatePriceForm : null}
      
      {/* Toggle In Stock or Out of Stock Button */}
      {isStocked ? <button onClick={handleStockBtn} className="primary">In Stock</button>:<button onClick={handleStockBtn}>Out of Stock</button>}

      {/* Delete Button */}
      <button onClick={handleDelete} className="danger">Delete</button>

      {/* Edit Price Button */}

      {wantUpdatePrice ? <button onClick={toggleUpdatePriceBtn} className="primary">Done</button> : <button onClick={toggleUpdatePriceBtn}>Edit Price</button>}
      
    </li>
  );
}

export default PlantCard;
