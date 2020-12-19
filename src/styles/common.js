export default (theme) => ({
  root: { width: '100%' },
  visible: { display: 'block' },
  flexVisible: { display: 'flex' },
  hidden: { display: 'none' },
  tableHeadCell: { color: '#888' },

  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

  linearProgressContainer: {
    width: '100%',
    marginBottom: 10,
    '& > * + *': { marginTop: 10 },
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});
