import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const applications = useSelector(store => store.job.allAppliedJobs);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications && applications.length > 0 ? (
                        applications.map((application, index) => (
                            <TableRow key={index}>
                                <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{application.job?.title || 'N/A'}</TableCell>
                                <TableCell>{application.job?.company?.name || 'N/A'}</TableCell>
                                    <TableCell className="text-right"><Badge className={`${application.status==="rejected" ? 'bg-red-400' : 'bg-green-400'}`}>{application.status.toUpperCase() || 'N/A'}</Badge></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No applied jobs found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable