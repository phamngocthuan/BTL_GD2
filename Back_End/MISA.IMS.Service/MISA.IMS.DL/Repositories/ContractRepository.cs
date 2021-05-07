using MISA.IMS.Data.Entities;
using MISA.IMS.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.IMS.DL.Repositories
{
    public class ContractRepository : BaseRepository<Contract>, IContractRepository
    {
        public ContractRepository(IDBContextFactory dbContextFactory) : base(dbContextFactory)
        {

            
        }
    }
}
