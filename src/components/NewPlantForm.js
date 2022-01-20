import React, {useState} from "react";

function NewPlantForm({onAddPlant}) {

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0
  })

  function manageFormData(event){
    let targetName = event.target.name;
    let targetValue = event.target.value;

    setFormData({
      ...formData,
      [targetName]: targetValue
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price)
    }
    // Send POST request to API
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPlant)
    })
      .then(r => r.json())
      .then(newPlant => {
        onAddPlant(newPlant)
        setFormData({name: "", image:"", price: 0})
      })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit} >
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={manageFormData}  />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={manageFormData} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={manageFormData} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
