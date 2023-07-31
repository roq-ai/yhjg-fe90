import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { feeValidationSchema } from 'validationSchema/fees';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.fee
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFeeById();
    case 'PUT':
      return updateFeeById();
    case 'DELETE':
      return deleteFeeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFeeById() {
    const data = await prisma.fee.findFirst(convertQueryToPrismaUtil(req.query, 'fee'));
    return res.status(200).json(data);
  }

  async function updateFeeById() {
    await feeValidationSchema.validate(req.body);
    const data = await prisma.fee.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFeeById() {
    const data = await prisma.fee.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
