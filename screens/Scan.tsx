import React from 'react';
import {View, Text} from 'react-native';
import Layout from '../components/Layout';
import BarcodeScan from '../components/BarcodeScan';

const Scan = () => {
  return (
    <Layout>
      <BarcodeScan />
    </Layout>
  );
};

export default Scan;
