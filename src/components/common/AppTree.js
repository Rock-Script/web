import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import Typography from '@mui/material/Typography';
import LabelIcon from '@mui/icons-material/Label';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';


const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '&.Mui-expanded': {
        fontWeight: theme.typography.fontWeightRegular,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
        color: 'var(--tree-view-color)',
      },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit',
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 0,
      [`& .${treeItemClasses.content}`]: {
        paddingLeft: theme.spacing(2),
      },
    },
  }));
  
  function StyledTreeItem(props) {
    const {
      bgColor,
      color,
      labelIcon: LabelIcon,
      labelInfo,
      labelText,
      ...other
    } = props;
  
    function onItemClick() {
      props.handleItemClick(props.nodeId);
    }

    return (
      <StyledTreeItemRoot
        onClick={() => onItemClick()}
        label={
          <Box sx={{ display: 'flex', alignItems: 'left', p: 0.5, pr: 0 }}>
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        {...other}
      />
    );
  }

function getItem(item, handleItemClick) {
    
    return <StyledTreeItem nodeId={item._id} key={item._id} labelText={item.name} labelIcon={LabelIcon} handleItemClick={handleItemClick}>
        {
            (item.children?.length > 0) && item.children.map(c => {
                return <StyledTreeItem nodeId={c._id} key={c._id} labelText={c.name} labelIcon={LabelIcon} handleItemClick={handleItemClick}></StyledTreeItem>
            })
        }
    </StyledTreeItem>
}
  
function AppTree({data, handleItemClick}) {

    return <TreeView
        aria-label="gmail"
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1 }}
    >
        {
            data.map(item => {
                return getItem(item, handleItemClick);
            })
        }
    </TreeView>
    
}

export default AppTree;