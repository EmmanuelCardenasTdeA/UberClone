// AI-assisted: see docs/AI_LOG.md #5
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, typography } from '../../theme';

/** Label shown above every registration field (adds a red * when required). */
export function FieldLabel({ label, required }) {
  if (!label) return null;
  return (
    <Text style={styles.label}>
      {label}
      {required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );
}

/** Error (or helper text) shown BELOW the field. Alerts are not allowed by the spec. */
export default function FieldMessage({ error, helperText }) {
  if (error) {
    return (
      <View style={styles.row} accessibilityLiveRegion="polite">
        <Ionicons name="alert-circle" size={14} color={colors.error} />
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  if (helperText) {
    return <Text style={styles.helper}>{helperText}</Text>;
  }
  return null;
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.error,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    flex: 1,
  },
  helper: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});

