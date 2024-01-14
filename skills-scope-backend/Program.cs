using skills_scope_backend.Repositories;

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
var connectionString = Environment.GetEnvironmentVariable("POSTGRESQLCONNSTR_SkillsScopeDBConnection")
    ?? builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Database connection string 'SkillsScopeDBConnection' not found.");

// Add scoped services for your repositories, passing in the connection string
builder.Services.AddScoped<IJobPostingRepository>(_ => new JobPostingRepository(connectionString));
builder.Services.AddScoped<ILocationRepository>(_ => new LocationRepository(connectionString));
builder.Services.AddScoped<ICompanyRepository>(_ => new CompanyRepository(connectionString));

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();
