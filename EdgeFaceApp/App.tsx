import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
} from 'react-native';

import {
  runAuthPipeline,
} from './src/workflow/authPipeline';

import {
  AuthState,
} from './src/types/auth';

export default function App() {

  const [state, setState] =
    useState<AuthState>('idle');

  const [message, setMessage] =
    useState('Starting...');

  useEffect(() => {

    async function start() {

      setState('detecting');
      setMessage(
        'Detecting face',
      );

      await delay(1000);

      setState(
        'quality_check',
      );

      setMessage(
        'Checking quality',
      );

      await delay(1000);

      setState('liveness');

      setMessage(
        'Running liveness',
      );

      await delay(1000);

      setState(
        'recognizing',
      );

      setMessage(
        'Recognizing',
      );

      const result =
        await runAuthPipeline(
          'test-image',
        );

      if (result.success) {

        setState(
          'authenticated',
        );

        setMessage(
          'Authenticated',
        );

      } else {

        setState(
          result.state,
        );

        setMessage(
          result.message ||
          'Failed',
        );
      }
    }

    start();

  }, []);

  return (

    <View
      style={{
        flex: 1,
        justifyContent:
          'center',

        alignItems:
          'center',

        backgroundColor:
          '#08111f',
      }}
    >

      <View
        style={{
          width: '85%',

          padding: 32,

          borderRadius: 24,

          backgroundColor:
            '#101b2d',

          alignItems:
            'center',
        }}
      >

        <Text
          style={{
            color: '#00ff99',

            fontSize: 32,

            fontWeight: '700',

            marginBottom: 24,
          }}
        >
          EdgeFace Secure
        </Text>

        <Text
          style={{
            color: '#ffffff',

            fontSize: 22,

            marginBottom: 16,
          }}
        >
          {state.toUpperCase()}
        </Text>

        <Text
          style={{
            color: '#8aa0c8',

            fontSize: 16,
          }}
        >
          {message}
        </Text>

      </View>

    </View>
  );
}

function delay(
  ms: number,
): Promise<void> {

  return new Promise<void>(
    resolve => {

      setTimeout(
        () => resolve(),
        ms,
      );
    },
  );
}