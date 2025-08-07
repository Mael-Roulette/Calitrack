import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";

const LegalNotices = () => {
	return (
		<SafeAreaView className='flex-1 px-5 bg-background'>
			<ScrollView className="pb-10">
				<View>
					<Text className='title-2'>Éditeur de l&apos;application</Text>
					<Text className='mt-2 text'>• Nom de l&apos;application : Calitrack</Text>
					<Text className='mt-1 text'>• Éditeur : Maël Roulette</Text>
					<Text className='mt-1 text'>• Contact : contact@mael-roulette.fr</Text>
					<Text className='mt-1 text'>• Statut : Développeur individuel</Text>
					<Text className='mt-1 text'>• Hébergement des données : Appwrite</Text>
					<Text className='indicator-text mt-2'>
						Calitrack est éditée à titre personnel. En l&apos;absence
						d&apos;immatriculation (SIRET), cette application ne peut pas être
						considérée comme une activité commerciale tant qu&apos;aucune
						monétisation effective n&apos;est mise en place.
					</Text>
				</View>

				<View>
					<Text className='title-2'>Propriété intellectuelle</Text>
					<Text className="text mt-2">
						L&apos;ensemble des contenus présents dans l&aposapplication (textes,
						logo, éléments graphiques) est la propriété exclusive de Maël
						Roulette, sauf mention contraire. Toute reproduction ou
						réutilisation est interdite sans autorisation préalable.
					</Text>
				</View>

				<View>
					<Text className='title-2'>Données personnelles</Text>
					<Text className='title-3'>Données collectées</Text>
					<Text className='mt-2 text'>
						L&apos;application Calitrack collecte les données suivantes :
					</Text>
					<Text className='mt-1 text'>• Pseudo (obligatoire)</Text>
					<Text className='mt-1 text'>• Adresse email (obligatoire)</Text>
					<Text className='mt-1 text'>• Photo de profil (facultative)</Text>
					<Text className='mt-1 text'>• Nombre d&apos;entraînements réalisés</Text>
					<Text className='mt-1 text'>
						• Objectifs et entraînements associés au profil utilisateur
					</Text>
					<Text className='mt-2 text'>
						Ces données sont utilisées uniquement dans le cadre de
						l&apos;utilisation de l&apos;application. Aucune donnée n&apos;est
						transmise à des tiers, sauf dans le cadre des services nécessaires
						au fonctionnement de l&apos;application (ex. Appwrite, Stripe).
					</Text>

					<Text className='title-3'>Hébergement et sécurité</Text>
					<Text>
						Les données sont stockées de manière sécurisée via Appwrite, un
						backend open-source.
					</Text>

					<Text className='title-3'>Services tiers</Text>
					<Text className='mt-1 text'>
						• Appwrite : backend (authentification, base de données, stockage)
					</Text>
					<Text className='mt-1 text'>
						• Stripe : gestion des paiements dans le cadre du plan premium
					</Text>
				</View>

				<View>
					<Text className='title-2'>Contact</Text>
					<Text className="text mt-2">
						Pour toute question ou demande relative à l&apos;application ou à
						vos données, vous pouvez contacter :
					</Text>
          <Text className="mt-1 text">contact@mael-roulette.fr</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default LegalNotices;
