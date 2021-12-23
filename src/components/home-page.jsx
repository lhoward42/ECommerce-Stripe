import React from 'react'
import Layout from './shared/layout'
import Hero from './hero/hero'
import MainSection from './main-section/main-section'
import FeaturedCollection from './featured-collection/featured-collection'

const HomePage = () => {
    return (
        <div>
            <Layout>
                <Hero />
                <MainSection />
                <FeaturedCollection />
            </Layout>
        </div>
    )
}

export default HomePage
