// AI-assisted: see docs/AI_LOG.md #3
import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, radius, typography, shadows } from '../theme/theme.js';

// TODO: Import your real screens once created:
// import PersonalInfoScreen from '../screens/PersonalInfoScreen';
// import VehicleInfoScreen from '../screens/VehicleInfoScreen';
// import DocumentsInfoScreen from '../screens/DocumentsInfoScreen';
// import { useDriverRegistration } from '../context/DriverRegistrationContext';

// Temporary fallback placeholders in case screens are not created yet
const PlaceholderScreen = ({ title }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{title}</Text>
  </View>
);

const PersonalInfoScreen = PlaceholderScreen;
const VehicleInfoScreen = PlaceholderScreen;
const DocumentsInfoScreen = PlaceholderScreen;

// Temporary fallback hook if context is not yet wired
const useDriverRegistrationFallback = () => ({
  isRegistrationValid: false,
  isSubmitting: false,
  submitRegistration: () => {},
  registrationStatus: 'draft', // or 'pending_approval'
});

const Tab = createBottomTabNavigator();

function TabBarIcon({ routeName, focused, color, size }) {
  let iconName = focused ? 'list' : 'list-outline';

  if (routeName === 'PersonalInfo') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (routeName === 'VehicleInfo') {
    iconName = focused ? 'car' : 'car-outline';
  } else if (routeName === 'DocumentsInfo') {
    iconName = focused ? 'document-text' : 'document-text-outline';
  }

  return <Ionicons name={iconName} size={size || 24} color={color || '#000'} />;
}

export default function RegistrationNavigator() {
  // Use real hook when ready, or fallback
  const {
    isRegistrationValid,
    isSubmitting,
    submitRegistration,
    registrationStatus,
  } = useDriverRegistrationFallback();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="PersonalInfo"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              routeName={route.name}
              focused={focused}
              color={color}
              size={size}
            />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        })}
      >
        <Tab.Screen
          name="PersonalInfo"
          component={PersonalInfoScreen}
          options={{
            title: 'Datos personales',
            tabBarLabel: 'Personales',
          }}
        />
        <Tab.Screen
          name="VehicleInfo"
          component={VehicleInfoScreen}
          options={{
            title: 'Vehículo',
            tabBarLabel: 'Vehículo',
          }}
        />
        <Tab.Screen
          name="DocumentsInfo"
          component={DocumentsInfoScreen}
          options={{
            title: 'Documentos',
            tabBarLabel: 'Documentos',
          }}
        />
      </Tab.Navigator>

      {/* Footer "Enviar registro" */}
      <View style={styles.footer}>
        {registrationStatus === 'pending_approval' ? (
          <View style={styles.pendingStatusContainer}>
            <Ionicons name="time-outline" size={24} color="#92400E" style={styles.pendingIcon} />
            <View style={styles.pendingTextContainer}>
              <Text style={styles.pendingTitle}>Estado: Pendiente de aprobación</Text>
              <Text style={styles.pendingSubtitle}>
                Tu registro fue enviado y está siendo revisado por el equipo.
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Pressable
              style={[
                styles.submitButton,
                (!isRegistrationValid || isSubmitting) && styles.submitButtonDisabled,
              ]}
              disabled={!isRegistrationValid || isSubmitting}
              onPress={submitRegistration}
            >
              {isSubmitting ? (
                <ActivityIndicator color={colors.primaryText} size="small" />
              ) : (
                <Text
                  style={[
                    styles.submitButtonText,
                    !isRegistrationValid && styles.submitButtonTextDisabled,
                  ]}
                >
                  Enviar registro
                </Text>
              )}
            </Pressable>

            {!isRegistrationValid ? (
              <Text style={styles.disabledReason}>
                Completa y valida las 3 pestañas para habilitar el envío
              </Text>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
    ...shadows.sm,
  },
  tabBarLabel: {
    ...typography.caption,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.sm,
  },
  submitButtonDisabled: {
    backgroundColor: colors.disabled,
    elevation: 0,
    shadowOpacity: 0,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.primaryText,
  },
  submitButtonTextDisabled: {
    color: colors.disabledText,
  },
  disabledReason: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  pendingStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pendingIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  pendingTextContainer: {
    flex: 1,
  },
  pendingTitle: {
    ...typography.label,
    fontWeight: '700',
    color: '#92400E',
  },
  pendingSubtitle: {
    ...typography.caption,
    color: '#B45309',
    marginTop: 2,
  },
});
