
import { useState } from 'react'
import { format, parse } from 'date-fns'
import { ChevronDown, RefreshCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const importDataList = [
  {
    importscreen: 'Claim Request(clreq)',
    importfile: 'XLImport.XLSX',
    importby: 'username',
    initiatedon: '02/04/2025 10:30:45',
    lastupdatedon: '02/04/2025 10:32:22',
    status: 'inprogress',
    stage: 'consumer',
    levelno: '3',
    remarks: 'Processing by consumer service.',
  },
  {
    importscreen: 'Invoice Upload(invup)',
    importfile: 'Invoices_March.XLSX',
    importby: 'admin',
    initiatedon: '01/04/2025 09:15:30',
    lastupdatedon: '01/04/2025 09:20:45',
    status: 'completed',
    stage: 'verification',
    levelno: '5',
    remarks: 'Successfully processed.',
  },
  {
    importscreen: 'Employee Data(empdata)',
    importfile: 'Employees_2025.XLSX',
    importby: 'hr_manager',
    initiatedon: '30/03/2025 14:45:10',
    lastupdatedon: '30/03/2025 14:50:12',
    status: 'failed',
    stage: 'validation',
    levelno: '2',
    remarks: 'Error in row 45.',
  },
  {
    importscreen: 'Employee Data(empdata)',
    importfile: 'Employees_2025.XLSX',
    importby: 'hr_manager',
    initiatedon: '30/03/2025 14:45:10',
    lastupdatedon: '30/03/2025 14:50:12',
    status: 'completed',
    stage: 'validation',
    levelno: '2',
    remarks: 'Successfully processed.',
  },
  {
    importscreen: 'Employee Data(empdata)',
    importfile: 'Employees_2025.XLSX',
    importby: 'hr_manager',
    initiatedon: '30/03/2025 14:45:10',
    lastupdatedon: '30/03/2025 14:50:12',
    status: 'completed',
    stage: 'validation',
    levelno: '2',
    remarks: 'Successfully processed.',
  },
]

const parseDate = (dateStr: string) => {
  return parse(dateStr, 'dd/MM/yyyy HH:mm:ss', new Date())
}

// const handleReinitiate = (importData: any) => {
//   const externalUrl = "http://localhost:56647/aspx/signin.aspx";
//
//   console.log('Reinitiating import for:', importData.importfile)
// }

const ImportStatus = () => {
  const [filteredStatus, setFilteredStatus] = useState('all')
  const [filteredScreen, setFilteredScreen] = useState('all')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);


  const filteredData = importDataList.filter(
    (item) =>
      (filteredStatus === 'all' || item.status === filteredStatus) &&
      (filteredScreen === 'all' || item.importscreen === filteredScreen),
  )

  const handleReinitiate = (importData: any) => {
    const externalUrl = "http://localhost:56647/aspx/signin.aspx";
    window.open(externalUrl, '_blank');

    console.log('Reinitiating import for:', importData.importfile)
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex space-x-4 mb-4">
        {filteredScreen !== 'all' && (
          <Badge variant="outline">Import Screen: {filteredScreen}</Badge>
        )}
        {filteredStatus !== 'all' && (
          <Badge variant="outline">Status: {filteredStatus}</Badge>
        )}
      </div>
      <Card className="shadow-lg p-4 rounded-xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Import Status </h2>
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  'Import Screen',
                  'Import File',
                  'Imported By',
                  'Initiated On',
                  'Last Updated On',
                  'Status',
                  'Stage',
                  'Remarks',
                  'Actions',
                ].map((col, index) => (
                  <TableHead
                    key={index}
                    className={`text-left relative ${col === 'Import Screen' ? 'w-40 min-w-[150px]' : ''}`}
                  >
                    {col}{' '}
                    {col === 'Import Screen' || col === 'Status' ? (
                      <Popover
                        open={openDropdown === col}
                        onOpenChange={(isOpen) =>
                          setOpenDropdown(isOpen ? col : null)
                        }
                      >
                        <PopoverTrigger onClick={() => setOpenDropdown(col)}>
                          <ChevronDown
                            className="inline ml-2 cursor-pointer"
                            size={16}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="bg-white shadow-md rounded-md p-2 w-40">
                          {['Status', 'Import Screen'].includes(col) && (
                            <div>
                              <button
                                className="w-full text-left p-1 hover:bg-gray-200"
                                onClick={() => {
                                  if (col === 'Status') setFilteredStatus('all')
                                  else setFilteredScreen('all')
                                  setOpenDropdown(null)
                                }}
                              >
                                All
                              </button>
                              {(col === 'Status'
                                ? ['inprogress', 'completed', 'failed']
                                : Array.from(
                                    new Set(
                                      importDataList.map(
                                        (item) => item.importscreen,
                                      ),
                                    ),
                                  )
                              ).map((value, idx) => (
                                <button
                                  key={idx}
                                  className="w-full text-left p-1 hover:bg-gray-200"
                                  onClick={() => {
                                    if (col === 'Status')
                                      setFilteredStatus(value)
                                    else setFilteredScreen(value)
                                    setOpenDropdown(null)
                                  }}
                                >
                                  {value}
                                </button>
                              ))}
                            </div>
                          )}
                        </PopoverContent>
                      </Popover>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((importData, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left">
                    {importData.importscreen}
                  </TableCell>
                  <TableCell className="text-left">
                    {importData.importfile}
                  </TableCell>
                  <TableCell className="text-left">
                    {importData.importby}
                  </TableCell>
                  <TableCell className="text-left">
                    {format(
                      parseDate(importData.initiatedon),
                      'dd/MM/yyyy HH:mm:ss',
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    {format(
                      parseDate(importData.lastupdatedon),
                      'dd/MM/yyyy HH:mm:ss',
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    <Badge
                      variant={
                        importData.status === 'inprogress'
                          ? 'default'
                          : importData.status === 'completed'
                            ? 'success'
                            : 'destructive'
                      }
                    >
                      {importData.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">
                    {importData.stage}
                  </TableCell>
                  <TableCell className="text-left">
                    {importData.remarks}
                  </TableCell>
                  <TableCell className="text-left">
                    {importData.status === 'failed' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReinitiate(importData)}
                      >
                        <RefreshCcw className="inline w-4 h-4 mr-1" />{' '}
                        Reinitiate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImportStatus
