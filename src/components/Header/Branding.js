import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import LogoLink from './DesktopNav/LogoLink'
import ServiceLink from './DesktopNav/ServiceLink'
import { logoColors } from './utils/navLinksHelper'
import getServiceInfo from '../../utils/getServiceInfo'

const StyledLinksContainer = styled.div`
  display: flex;
  align-items: center;
`

const TopNavBranding = ({ path, slug }) => (
  <StaticQuery
    query={graphql`
      {
        services: allContentfulService {
          nodes {
            slug
            specialityAreaItems1 {
              id
              slug
              title
            }
            specialityAreaItems2 {
              id
              slug
              title
            }
            specialityAreaItems3 {
              id
              slug
              title
            }
            specialityAreaItems4 {
              id
              slug
              title
            }
          }
        }
        specialities: allContentfulSpeciality {
          nodes {
            slug
            logoColour
          }
        }
      }
    `}
    render={({ services, specialities }) => {
      const {
        isServicePage,
        isSpecialityPage,
        specialityColor,
        service
      } = getServiceInfo({
        services,
        specialities,
        slug
      })

      const isHomePage = path === '/'
      const isEventsPage = path.includes('events')

      const fillColorInitial = isSpecialityPage
        ? specialityColor || logoColors.specialitiesFillDefault
        : logoColors['default']

      const fillColorHover =
        logoColors[isSpecialityPage ? 'specialityHover' : 'defaultHover']

      const textColor =
        logoColors[isSpecialityPage ? 'specialityText' : 'defaultText']

      return (
        <StyledLinksContainer>
          <LogoLink
            isHomePage={isHomePage}
            isEventsPage={isEventsPage}
            isServiceOrSpecialityPage={isServicePage || isSpecialityPage}
            fillColorInitial={fillColorInitial}
            fillColorHover={fillColorHover}
            textColor={textColor}
          />
          <ServiceLink
            isSpecialityPage={isSpecialityPage}
            isServicePage={isServicePage}
            service={service}
          />
        </StyledLinksContainer>
      )
    }}
  />
)

export default TopNavBranding