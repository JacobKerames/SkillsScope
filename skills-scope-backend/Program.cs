using skills_scope_backend.Repositories;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000", // Development origin
                "https://skillsscope.com/" // Production origin
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Read the connection string from the configuration
var defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Database connection string 'DefaultConnection' not found.");

// Add scoped services for your repositories, passing in the connection string
builder.Services.AddScoped<IJobPostingRepository>(_ => new JobPostingRepository(defaultConnectionString));
builder.Services.AddScoped<ILocationRepository>(_ => new LocationRepository(defaultConnectionString));
builder.Services.AddScoped<ICompanyRepository>(_ => new CompanyRepository(defaultConnectionString));

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
