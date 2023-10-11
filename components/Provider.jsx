'use client'

import React from 'react';
import PropTypes from 'prop-types';
import { SessionProvider } from 'next-auth/react';

const Provider = React.memo(({ children, session }) => (

    <SessionProvider session={session}>
        {children}
    </SessionProvider>
    
))

Provider.propTypes = {
    children: PropTypes.node.isRequired,
    session: PropTypes.object.isRequired
}

export default Provider;
