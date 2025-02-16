// Description: This component is used to display the details of a pokemon in a modal.

import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import useGetOnePokemonEvolutions from "../interface/fetchPokemonEvolution";
import useGetOnePokemonPreEvolutions from "../interface/fetchPokemonPreEvolution";
import { Pokemon } from "../interface/pokemon";
import useGetPokemon from "./useGetPokemon";

export default function DetailsPokemon({ id }: { id: string }) {
  const [detailsPokemon, setDetailsPokemon] = useState<Pokemon[]>([]);

  const { pokemon } = useGetPokemon(Number(id));
  const [evolution, setEvolution] = useState<Evolution | null>(null);
  const [preEvolution, setPreEvolution] = useState<PreEvolution | null>(null);

  interface Evolution {
    id: number;
    name: string;
    image: string;
  }

  interface PreEvolution {
    id: number;
    name: string;
    image: string;
  }

  // Fetch the details of a pokemon with the id passed in parameter
  useEffect(() => {
    const fetchDetailsPokemon = async () => {
      const response = await fetch(
        `https://pokebuildapi.fr/api/v1/pokemon/${id}`
      );
      const data = await response.json();
      setDetailsPokemon([data]);
    };
    fetchDetailsPokemon();
  }, [id]);

  // Fetch the evolution of a pokemon
  useEffect(() => {
    const fetchPokemonEvolutions = async () => {
      if (
        pokemon &&
        Array.isArray(pokemon.apiEvolutions) &&
        pokemon.apiEvolutions.length > 0
      ) {
        const evolutionData = await useGetOnePokemonEvolutions(
          pokemon.apiEvolutions[0].pokedexId
        );
        setEvolution(evolutionData);
      } else {
        setEvolution(null);
      }
    };
    fetchPokemonEvolutions();
  }, [pokemon]);

  // Fetch the pre-evolution of a pokemon
  useEffect(() => {
    const fetchPokemonPreEvolution = async () => {
      if (
        typeof pokemon?.apiPreEvolution === "object" &&
        pokemon.apiPreEvolution !== null
      ) {
        const preEvolutionData = await useGetOnePokemonPreEvolutions(
          pokemon.apiPreEvolution.pokedexIdd
        );
        setPreEvolution(preEvolutionData);
      } else {
        setPreEvolution(null);
      }
    };
    fetchPokemonPreEvolution();
  }, [pokemon]);

  // If the details of the pokemon are not loaded, return null
  if (!detailsPokemon) return null;

  // Display the details of the pokemon
  return (
    <View>
      <View>
        {detailsPokemon.map((detailPokemon: Pokemon) => (
          <View key={detailPokemon.id}>
            <Text style={styles.title}>{detailPokemon.name}</Text>
            <Image
              style={styles.imgPokemon}
              source={{ uri: detailPokemon.image }}
              alt={detailPokemon.name}
            />
            {detailPokemon.apiTypes[0] && detailPokemon.apiTypes[1] ? (
              <View style={styles.globalImgType}>
                <Image
                  style={styles.imgType}
                  source={{ uri: detailPokemon.apiTypes[0].image }}
                  alt={detailPokemon.apiTypes[0].name}
                />
                <Image
                  style={styles.imgType}
                  source={{ uri: detailPokemon.apiTypes[1].image }}
                  alt={detailPokemon.apiTypes[1].name}
                />
              </View>
            ) : (
              <View style={styles.globalImgTypeAlone}>
                <Image
                  style={styles.imgType}
                  source={{ uri: detailPokemon.apiTypes[0].image }}
                  alt={detailPokemon.apiTypes[0].name}
                />
              </View>
            )}
            <View style={styles.globalStats}>
              <Text>HP: {detailPokemon.stats.HP}</Text>
              <Text>Attack: {detailPokemon.stats.attack}</Text>
              <Text>Defense: {detailPokemon.stats.defense}</Text>
              <Text>Special Attack: {detailPokemon.stats.special_attack}</Text>
              <Text>
                Special Defense: {detailPokemon.stats.special_defense}
              </Text>
              <Text>Speed: {detailPokemon.stats.speed}</Text>
            </View>
            <View style={styles.globalEvolution}>
              {preEvolution ? (
                <View>
                  <Image
                    style={styles.imgPokemonEvolution}
                    source={{ uri: preEvolution.image }}
                  />
                </View>
              ) : null}
              {evolution ? (
                <View>
                  <Image
                    style={styles.imgPokemonEvolution}
                    source={{ uri: evolution.image }}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  globalStats: {
    alignItems: "center",
    marginTop: 20,
  },

  globalImgType: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  globalImgTypeAlone: {
    flexDirection: "row",
    justifyContent: "center",
  },

  globalEvolution: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  imgPokemon: {
    width: 200,
    height: 200,
    marginTop: 20,
  },

  imgPokemonEvolution: {
    width: 100,
    height: 100,
  },

  imgType: {
    width: 50,
    height: 50,
  },
});