### Step 1: Build the application
FROM openjdk:21-slim as build 

# Set current working directory inside the image
WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn

# Convert line endings from CRLF to LF
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Copy the pom.xml file
COPY pom.xml .

# Build all the dependencies to go offline
# Dependencies will be cached unless the pom.xml file has changed
RUN ./mvnw dependency:go-offline -B

# Copy the project source
COPY src src

#Package the applicaiton
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

### Step 2: A minimal docker image with command to run the app
FROM openjdk:21-slim

ARG DEPENDENCY=/app/target/dependency

# Copy project dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","com.proj.EventsBlitz.EventsBlitzApplication"]