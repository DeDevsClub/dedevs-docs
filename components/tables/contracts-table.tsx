"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  TableMeta,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contract, Network as NetworkEnum } from "@/data/build";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { explorerUrl } from "@/config/explorers";

// Define the structure for the data displayed in the table
interface DisplayedContract {
  name: string;
  network: string;
  address: string;
}

// Define a meta interface for type safety with table.options.meta
interface ContractsTableMeta extends TableMeta<DisplayedContract> {
  handleCopyAddress: (address: string) => Promise<void>;
  copiedAddress: string | null;
}

export const columns: ColumnDef<DisplayedContract>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "network",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Network
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("network")}</div>,
    filterFn: (row, columnId, filterValue: string[] | undefined) => {
      if (filterValue === undefined || filterValue.length === 0) {
        return true; // No filter applied or "All" selected (empty array means all)
      }
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="text-right">Address</div>,
    cell: ({ row, table }) => {
      const address: string = row.getValue("address");
      const meta = table.options.meta as ContractsTableMeta | undefined;
      const isCopied = meta?.copiedAddress === address;
      const url = explorerUrl(row.getValue("network"));

      return (
        <div className="font-medium justify-end items-center flex w-full">
          <div
            className="flex items-center gap-2 truncate mr-2"
            title={address}
          >
            {address}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Icon
              icon={isCopied ? "tabler:check" : "tabler:copy"}
              className={`inline-block size-4 cursor-pointer ${
                isCopied ? "text-green-500" : "hover:text-primary"
              }`}
              onClick={() => meta?.handleCopyAddress?.(address)}
            />
            <Icon
              icon="tabler:external-link"
              className="inline-block size-4 cursor-pointer hover:text-primary"
              onClick={() => window.open(url + "/address/" + address, "_blank")}
            />
          </div>
        </div>
      );
    },
  },
];

export function ContractsTable({
  contracts: inputContracts,
}: {
  contracts: Contract[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [copiedAddress, setCopiedAddress] = React.useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedNetworkFilters, setSelectedNetworkFilters] = React.useState<string[]>([NetworkEnum.ETH, NetworkEnum.BASE]);

  // Transform the input contracts data into a flat structure for the table
  const data = React.useMemo(() => {
    const displayedContracts: DisplayedContract[] = [];
    inputContracts.forEach((contract) => {
      Object.entries(contract.address).forEach(([network, address]) => {
        if (address) {
          // Ensure address is defined
          displayedContracts.push({
            name: contract.name,
            network: network, // This will be 'ethereum' or 'base'
            address: address as string,
          });
        }
      });
    });
    return displayedContracts;
  }, [inputContracts]);

  // Effect to update the actual table filter when selectedNetworkFilters changes
  React.useEffect(() => {
    // If selectedNetworkFilters is empty, it means "All" are selected for viewing,
    // so we pass `undefined` to clear the table's filter for the network column.
    // Otherwise, pass the array of selected networks to the filter.
    table.getColumn("network")?.setFilterValue(selectedNetworkFilters.length > 0 ? selectedNetworkFilters : [NetworkEnum.ETH, NetworkEnum.BASE]);
  }, [selectedNetworkFilters]);

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!");
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000); // Reset icon after 2 seconds
    } catch (err) {
      toast.error("Failed to copy address.");
      console.error("Failed to copy address: ", err);
    }
  };

  const table = useReactTable({
    data, // Use the transformed data
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      // Pass methods and state to table instance
      handleCopyAddress,
      copiedAddress,
    } as ContractsTableMeta, // Cast meta to our defined interface
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu> {/* Networks Filter Dropdown */}
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Networks <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            {/* Individual network options */}
            {Object.values(NetworkEnum).map((networkValue) => (
              <DropdownMenuCheckboxItem
                key={networkValue}
                checked={selectedNetworkFilters.includes(networkValue)}
                onCheckedChange={(isChecked) => {
                  if (isChecked) {
                    setSelectedNetworkFilters((prev) => [...prev, networkValue]);
                  } else {
                    setSelectedNetworkFilters((prev) =>
                      prev.filter((n) => n !== networkValue)
                    );
                  }
                }}
              >
                {networkValue}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContractsTable;
