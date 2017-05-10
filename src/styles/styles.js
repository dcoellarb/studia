import { globalColors } from './globals';

export default {
  barMargin: {
    marginTop: 56
  },
  roundItem: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  roundSmallItem: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  actionWrapper: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionSmallWrapper: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white'
  },
  actionButton: {
    backgroundColor: globalColors.primary,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
    actionButtonText: {
    color: 'white',
    fontSize: 12    
  },
  indicator: {
    marginTop: 3,
    width: 4,
    height: 4,
    backgroundColor: globalColors.secondary,
    borderRadius: 2
  }  
}
