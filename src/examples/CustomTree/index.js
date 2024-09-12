import * as React from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { unstable_useTreeItem2 as useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2GroupTransition,
  TreeItem2Label,
  TreeItem2Root,
  TreeItem2Checkbox,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { Dashboard } from "@mui/icons-material";
import SoftBox from "components/SoftBox";



const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <CustomTreeItemContent {...getContentProps()}>
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <Box className="items-center" sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            <Avatar
              sx={(theme) => ({
                background: theme.palette.secondary.main,
                width: 24,
                height: 24,
                fontSize: '0.8rem',
              })}
            >
              {typeof label === 'string' ? label[0] : null}
            </Avatar>
            {typeof label === 'string' ? (
              <TreeItem2Label {...getLabelProps()}>{label}</TreeItem2Label>
            ) : (
              label
            )}
          </Box>
        </CustomTreeItemContent>
        {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

// Add prop-types validation
CustomTreeItem.propTypes = {
  id: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default function HeadlessAPI() {
  return (
    <Box sx={{ minHeight: 200, minWidth: 250 }}>
      <SimpleTreeView defaultExpandedItems={['3']}>
        <CustomTreeItem itemId="1" label="Parent-1 ">
          <CustomTreeItem itemId="2"    label={
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-sm font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                  <SoftBox>
                    <div
                      role="button"
                      className="flex flex-col md:flex-row items-center justify-between w-full px-3 border-gray-200 dark:border-slate-600 leading-tight"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                          <Dashboard />
                        </span>
                        <span className="font-medium text-sm dark:text-white">AS1</span>
                        <SoftBox className="cursor-pointer text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit">
                         Child Assets Name 1111
                        </SoftBox>
                      </div>
                    </div>
                  </SoftBox>
                </nav>
              } />
        </CustomTreeItem>
        <CustomTreeItem itemId="3" label="Parent-2">
          <CustomTreeItem itemId="4" label="Child_A" />
          <CustomTreeItem itemId="5" label="Child_B">
            <CustomTreeItem
              itemId="6"
              label={
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-sm font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                  <SoftBox>
                    <div
                      role="button"
                      className="flex flex-col md:flex-row items-center justify-between w-full px-3 border-gray-200 dark:border-slate-600 leading-tight"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                          <Dashboard />
                        </span>
                        <span className="font-medium text-sm dark:text-white">AS1</span>
                        <SoftBox className="cursor-pointer text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit">
                       Child_B Assets Name 666666666
                        </SoftBox>
                      </div>
                    </div>
                  </SoftBox>
                </nav>
              }
            />
          </CustomTreeItem>
        </CustomTreeItem>
      </SimpleTreeView>
    </Box>
  );
}
