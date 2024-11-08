import { Dataset } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

/* Renders a single row in the List Dataset table. See list/page.tsx. */
const DatasetItem = ({ id, name, url, topic, description, org, orgIcon }: Dataset) => (
  <tr>
    <td>{name}</td>
    <td>{url}</td>
    <td>{topic}</td>
    <td>{description}</td>
    <td>{org}</td>
    <td>
      <Image src={orgIcon} alt={`${org} icon`} width="100" height="100" />
    </td>
    <td>
      <Link href={`/edit/${id}`}>Edit</Link>
    </td>
  </tr>
);

export default DatasetItem;
