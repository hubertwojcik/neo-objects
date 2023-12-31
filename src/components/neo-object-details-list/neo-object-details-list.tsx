import type { NeoObjectDetails, Nullabe } from '@/shared/types';
import { getElevation } from '@/shared/utils';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EstimatedDiameterDetails } from './estimated-diameter-details';

import { PlainNeoDetail } from './plain-neo-detail';
import { RelativeVelocityDetails } from './relative-velocity-details';

type NeoObjectDetailsListProps = { details: Nullabe<NeoObjectDetails> };

export const NeoObjectDetailsList = ({
  details,
}: NeoObjectDetailsListProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Skeleton.Group show={details == null}>
      <View
        style={[
          styles.listContainer,
          {
            paddingBottom: insets.bottom + 20,
          },
        ]}
      >
        <PlainNeoDetail
          name="Is potentially hazardous asteroid"
          detail={
            details == null
              ? null
              : details.isPotentiallyHazardousAsteroid
                ? 'Yes'
                : 'No'
          }
        />
        <PlainNeoDetail
          name="Absolute magnitude"
          detail={details == null ? null : details.absoluteMagnitude.toFixed(1)}
        />
        <EstimatedDiameterDetails
          estimatedDiameter={details == null ? null : details.estimatedDiameter}
        />
        <PlainNeoDetail
          name="First observation date"
          detail={details == null ? null : details.firstObservation}
        />
        <PlainNeoDetail
          name="Previous close approach"
          detail={details == null ? null : details.previousApproachDate}
        />
        <PlainNeoDetail
          name="Next close approach"
          detail={details == null ? null : details.nextApproachDate}
        />
        <PlainNeoDetail
          name="Orbital period"
          detail={
            details == null ? null : Number(details.oribitalPeriod).toFixed(2)
          }
        />
        <PlainNeoDetail
          name="Orbiting body"
          detail={details == null ? null : details.orbitingBody}
        />
        <RelativeVelocityDetails
          relativeVelocity={details == null ? null : details.relativeVelocity}
        />
        <PlainNeoDetail
          name="Orbit class type"
          detail={details == null ? null : details.orbitClassType}
        />
        <PlainNeoDetail
          name="Orbit class description"
          detail={details == null ? null : details.orbitClassDescription}
        />
        <PlainNeoDetail
          name="Orbit class range"
          detail={details == null ? null : details.orbitClassRange}
        />
      </View>
    </Skeleton.Group>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    ...getElevation({ elevation: 5, hegihtShadowOffset: 20 }),
  },
});
