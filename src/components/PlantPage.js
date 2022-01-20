import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(plantsData => setPlants(plantsData))
  }, [])

  // ** Handle Search
  function handleSearchChange(newSearch) {
    // console.log(newSearch)
    setSearch(newSearch)
  }
  const displayedPlants = plants.filter(plant => 
      plant.name.toLowerCase().includes(search.toLowerCase()))
  
  // ** Handle Add New Plant
  function handleAddPlant(newPlant){
    setPlants([...plants, newPlant])
  }

  // ** Handle Delete Plant
  function handleDeletePlant(id){
    const updatedPlants = plants.filter(plant => plant.id !== id)
    setPlants(updatedPlants)
  }

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search search={search} onSearchChange={handleSearchChange}/>
      <PlantList plants={displayedPlants} onDeletePlant={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
