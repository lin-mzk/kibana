/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { Fragment } from 'react';
import { EuiTitle } from '@elastic/eui';
import { Redirect } from 'react-router-dom';
import { useGetPackageInstallStatus } from '../../hooks';
import { InstallStatus } from '../../../../types';
import { useLink } from '../../../../hooks';

interface DataSourcesPanelProps {
  name: string;
  version: string;
}
export const DataSourcesPanel = ({ name, version }: DataSourcesPanelProps) => {
  const { getPath } = useLink();
  const getPackageInstallStatus = useGetPackageInstallStatus();
  const packageInstallStatus = getPackageInstallStatus(name);
  // if they arrive at this page and the package is not installed, send them to overview
  // this happens if they arrive with a direct url or they uninstall while on this tab
  if (packageInstallStatus.status !== InstallStatus.installed)
    return <Redirect to={getPath('integration_details', { pkgkey: `${name}-${version}` })} />;
  return (
    <Fragment>
      <EuiTitle size="xs">
        <span>Data Sources</span>
      </EuiTitle>
    </Fragment>
  );
};
