const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
const withReactSvg = require('next-react-svg')
const path = require('path')

const nextConfig = {
  distDir: 'public',
  webpack: (config, options) => config
}

module.exports = withPlugins(
  [
    [
      withMDX,
      {
        pageExtensions: ['js', 'jsx', 'mdx']
      }
    ],
    [
      withReactSvg,
      {
        include: path.resolve(__dirname, 'svg')
      }
    ]
  ],
  nextConfig
)
