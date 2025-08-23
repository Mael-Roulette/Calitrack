// components/PricingCard.tsx
import { PricingPlan } from "@/types/pricing";
import { FEATURE_CONFIGS } from "@/types/pricing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface PricingCardProps {
  plan: PricingPlan;
  currentPlan?: string;
  onSelect?: (planId: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  currentPlan,
  onSelect = () => {},
  isLoading = false,
  disabled = false,
}) => {
  const isCurrentPlan = currentPlan === plan.id;
  const isFree = plan.price === 0;

  // Logique du texte du bouton centralisée
  const getButtonConfig = () => {
    if (isCurrentPlan) {
      return { text: "Plan actuel", disabled: true };
    }

    if (isFree) {
      return { text: "Continuer gratuitement", disabled: false };
    }

    if (currentPlan === "free") {
      return { text: "Passer au premium", disabled: false };
    }

    return { text: "Changer de plan", disabled: false };
  };

  // Icône pour les fonctionnalités avec gestion des valeurs spéciales
  const getFeatureIcon = (value: any) => {
    if (typeof value === "number") {
      if (value === -1) {
        return <Ionicons name='infinite' size={16} color='#10B981' />;
      }
      return value > 0 ?
        <Ionicons name='checkmark-circle' size={16} color='#10B981' /> :
        <Ionicons name='close-circle' size={16} color='#EF4444' />;
    }

    if (typeof value === "boolean") {
      return (
        <Ionicons
          name={value ? "checkmark-circle" : "close-circle"}
          size={16}
          color={value ? "#10B981" : "#EF4444"}
        />
      );
    }

    // Pour les autres types, considérer comme vrai si défini et non falsy
    const hasFeature = !!value;
    return (
      <Ionicons
        name={hasFeature ? "checkmark-circle" : "close-circle"}
        size={16}
        color={hasFeature ? "#10B981" : "#EF4444"}
      />
    );
  };

  // Formatage des valeurs de fonctionnalités
  const formatFeatureValue = (config: any, value: any): string => {
    if (config.formatValue) {
      return config.formatValue(value);
    }

    if (typeof value === "boolean") {
      return config.label;
    }

    if (typeof value === "number") {
      if (value === -1) return `${config.label} illimités`;
      if (value === 0) return `Pas de ${config.label.toLowerCase()}`;
      return `${value} ${config.label.toLowerCase()} max`;
    }

    return config.label;
  };

  // Rendu des fonctionnalités basé sur la configuration
  const renderFeatures = () => {
    return FEATURE_CONFIGS
      .filter(config => plan.features.hasOwnProperty(config.key))
      .map((config, index) => {
        const value = plan.features[config.key];
        const hasFeature = typeof value === 'boolean' ? value :
                          typeof value === 'number' ? (value > 0 || value === -1) :
                          !!value;

        return (
          <View key={config.key} className='flex-row items-center gap-3 mb-2'>
            {getFeatureIcon(value)}
            <Text
              className={`font-sregular flex-1 ${
                hasFeature ? "text-primary" : "text-primary-100"
              }`}
            >
              {formatFeatureValue(config, value)}
            </Text>
          </View>
        );
      });
  };

  // Rendu du prix avec gestion des intervalles
  const renderPrice = () => {
    if (isFree) {
      return (
        <Text className='font-calsans text-4xl text-secondary'>
          Gratuit
        </Text>
      );
    }

    const intervalText = {
      'monthly': '/mois',
      'yearly': '/an',
      'lifetime': ' (unique)',
      '': ''
    }[plan.interval] || `/${plan.interval}`;

    return (
      <View className='flex-row items-baseline gap-1'>
        <Text className='font-calsans text-4xl text-secondary'>
          {plan.price.toFixed(plan.price % 1 === 0 ? 0 : 2)}€
        </Text>
        {intervalText && (
          <Text className='font-sregular text-primary-100'>
            {intervalText}
          </Text>
        )}
      </View>
    );
  };

  const buttonConfig = getButtonConfig();

  return (
    <View className='relative p-6 bg-background border border-secondary rounded-md'>
      {/* Badge plan actuel ou badge personnalisé */}
      {(isCurrentPlan || plan.badge) && (
        <View className='absolute -top-3 right-4 z-10'>
          <View className={`px-3 py-1 rounded-full ${
            isCurrentPlan
              ? 'bg-green-500'
              : plan.badge === 'POPULAIRE'
                ? 'bg-orange-500'
                : 'bg-blue-500'
          }`}>
            <Text className='text-white font-semibold text-xs'>
              {isCurrentPlan ? '✓ ACTUEL' : plan.badge}
            </Text>
          </View>
        </View>
      )}

      {/* Header */}
      <View className='mb-6'>
        <Text className='font-calsans text-2xl text-primary mb-2'>
          {plan.name}
        </Text>

        <View className='mb-2'>
          {renderPrice()}
        </View>

        {plan.description && (
          <Text className='text-primary-100 font-sregular'>
            {plan.description}
          </Text>
        )}
      </View>

      {/* Highlights */}
      {plan.highlights && plan.highlights.length > 0 && (
        <View className='mb-6'>
          {plan.highlights.map((highlight, index) => (
            <View key={index} className='flex-row items-center gap-3 mb-2'>
              <Ionicons name='star' size={16} color='#FC7942' />
              <Text className='font-semibold text-primary'>{highlight}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Fonctionnalités détaillées */}
      <View className='mb-8'>
        <Text className='font-semibold text-primary mb-4'>
          Fonctionnalités incluses :
        </Text>
        {renderFeatures()}
      </View>

      {/* Bouton d'action */}
      <TouchableOpacity
        onPress={() => !buttonConfig.disabled && !isLoading && onSelect(plan.id)}
        disabled={buttonConfig.disabled || isLoading || disabled}
        activeOpacity={0.8}
        className={`w-full py-4 rounded-xl ${
          isCurrentPlan || buttonConfig.disabled
            ? "bg-gray-200 border border-gray-300"
            : isLoading || disabled
              ? "bg-gray-100 border border-gray-200"
              : "bg-secondary"
        }`}
      >
        {isLoading ? (
          <ActivityIndicator
            color={isCurrentPlan || buttonConfig.disabled ? "#6B7280" : "#FFF9F7"}
          />
        ) : (
          <Text
            className={`text-center font-semibold ${
              isCurrentPlan || buttonConfig.disabled
                ? "text-gray-600"
                : "text-background"
            }`}
          >
            {buttonConfig.text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PricingCard;