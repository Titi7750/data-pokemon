// Description: This file contains the function that fetches the pre-evolution of a pokemon from the API.

import axios from "axios";

// Define the PreEvolution interface
interface PreEvolution {
  id: number;
  name: string;
  pokedexIdd: number;
  image: string;
}

// Fetch the pre-evolution of a pokemon by id
const useGetOnePokemonPreEvolutions = async (
  prevEvolutionId: number
): Promise<PreEvolution> => {
  try {
    const pokemonPreEvolution = await axios.get(
      `https://pokebuildapi.fr/api/v1/pokemon/${prevEvolutionId}`
    );
    return pokemonPreEvolution.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default useGetOnePokemonPreEvolutions;