using Core.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Taha",
                    Email = "tahamohamedman@gmail.com",
                    UserName = "Taha",
                    Address = new Address
                    {
                        FirstName = "Taha",
                        LastName = "Mohamed",
                        Street = "Oubour",
                        City = "Cairo",
                        State = "EG",
                        ZipCode = "11828"
                    }
                };
                await userManager.CreateAsync(user , "P@ssw0rd");
            }
        }
    }
}
