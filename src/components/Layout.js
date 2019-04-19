// import React, { PureComponent } from 'react'
// import Link from 'next/link'

// export default class Layout extends PureComponent {
//   render () {
//     return (
//       <div className='layout'>
//         <header>
//           <img src='/static/next-logo.png' />
//           <h3>nextjs redux starter</h3>
//           <menu>
//             <Link href='/about'>
//               <a>About</a>
//             </Link>
//             <Link href='/'>
//               <a>Redux demo</a>
//             </Link>
//           </menu>
//           <style jsx>{`
//             header {
//               display: flex;
//               align-items: center;
//               font-family: Monospace;
//               margin: 10px 20px;
//             }
//             h3 {
//               margin-left: 10px
//             }
//             img {
//               width: 30px;
//             }
//             menu > a {
//               margin-right: 16px;
//             }
//           `}</style>
//         </header>
//         { this.props.children }
//       </div>
//     )
//   }
// }
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

function ButtonAppBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
