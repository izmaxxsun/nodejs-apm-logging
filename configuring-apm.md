# Configuring Application Performance Monitoring
Now that our application is running, we want to be able to monitor requests being made to it and understand things such as which resources are being accessed or where our performance is starting to degrade.  This is where Application Performance Monitoring (APM) comes in.

You may have heard of distributed tracing, transactions, traces, spans...these all play in to getting insights like the following which help determine where errors or slowdowns are happening.  The concept of distributed tracing is further explained here: https://www.elastic.co/guide/en/apm/guide/current/apm-distributed-tracing.html.

<img src="https://www.elastic.co/guide/en/apm/guide/current/images/apm-distributed-tracing.png" />

## APM Agent and APM Server
The two components we'll need to get the APM show going are the **APM agent** and the **APM Server**.
* The **APM Agent** is the instrumentation we add to the code (or in some cases like with Java we can use auto-instrumentation so zero code changes are required) to collect the traces and metrics from the application.  Now **instrumentation** sounds fancy but as we'll see in a bit, it doesn't take much to setup.
* The **APM Server** will be where the APM data gets sent. We'll need to get the Elastic Stack deployed which we'll talk about in the next section.

For this example, we'll configure the APM Agent and APM Server as follows:
<img src="https://www.elastic.co/guide/en/apm/guide/current/images/apm-architecture.png">

Reference: https://www.elastic.co/guide/en/apm/guide/current/upgrade-to-apm-integration.html

## Deploying the Elastic Stack
There are several ways to deploy the Elastic stack, in order of increasing difficulty:

1) Fully-managed cloud offering (start a [free trial](https://www.elastic.co/industries/public-sector/fedramp) with no credit card)
2) Self managed with Elastic Cloud for Kubernetes (ECK) or Elastic Cloud Enterprise (ECE)...these are orchestrated options making it simple to install and upgrade to have access to the latest features. Orchestration = Automation.
3) Self-managed using binaries

Options 2 and 3 are self-managed options meaning you can deploy it on-premise, in a private cloud, or wherever you like. For more details on deploying with Option 3, check out https://github.com/izmaxxsun/elastic-stack-deployment-linux which walks through a Linux install. 

✋ After you have Elasticsearch, Kibana, and Fleet Server installed and configured you're ready to go to the next step. 

## Adding the APM Agent
Let's see what **instrumentation** is all about now.  

* First, we add the **elastic-apm-node** module as a dependency to the application.  Open up a Terminal session from the same folder where the NodeJS application is and run the following:

```
npm install elastic-apm-node --save
```

* Now we need to start the agent with required settings for it to reach out to the APM server. It's important that the agent gets started before anything else in the application so put it up at the very top.

```
// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'filerepo_service',
  
    // Use if APM Server requires a token
    secretToken: '',
  
    // Use if APM Server uses API keys for authentication
    apiKey: '<api_key>',
  
    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: '<apm_server_url>',
  })
```
* For an Elastic Cloud deployment, this is where you'd get the APM Server URL:

![image](https://user-images.githubusercontent.com/100947826/192604282-6f7097db-5bd4-471a-842e-7f2f1edd8c12.png)

* For deployments with Fleet-managed agents (which is the preferred path for most use cases), this can be found in the Agent Policy settings for the APM integration

![image](https://user-images.githubusercontent.com/100947826/192604803-d72457b7-c9ca-4585-b5bf-43fa78994fef.png)

* To use API keys for authentication, create an APM Agent Key from the APM Settings page

![image](https://user-images.githubusercontent.com/100947826/192604973-7f50a1a1-5d52-4cbc-8bf7-0915642f9fb5.png)

Reference: https://www.elastic.co/guide/en/apm/agent/nodejs/current/express.html

## Check Out Your APM Data
* Now that our application is **instrumented** (that wasn't so bad was it?), start it up again:

```
npm start
```

* Navigate to Observability > APM > Services to see data on your APM-instrumented service

![image](https://user-images.githubusercontent.com/100947826/192605469-b1b267fe-c6bb-4634-bb4d-a36915b90633.png)

* Click on the Service, to dig deeper and explore

![image](https://user-images.githubusercontent.com/100947826/192605628-c2c97891-af82-41f0-b4bf-d64b5e535be3.png)

* If there were more complex transactions involving other microservices or database calls, we'd see that as part of the transaction in the APM UI.  We can apply machine learning to surface issues and much more, it all starts with gathering the data.

## Exploring Data with Visualizations
All the data being collected, whether it's logs, metrics or other telemetry is available to be explored. The Discover UI is one way to look at data, another is to experiment with Kibana's (part of the Elastic Stack) reporting and analytics capabilities.

Let's walk through an example of building a report to see which devices (e.g. Mac OSX, iOS, Android) users are accessing our data with.

* Navigate to Analytics > Visualize Library
* Click **Create Visualization**
* Select **Lens**. This is great for drag-and-drop building of reports and capable of generating all types of charts.
* With the **APM** data view selected (in the top left), drag **url.path** onto the working area

![image](https://user-images.githubusercontent.com/100947826/192608134-11a6186e-a2c4-42eb-9515-d96b51ec610b.png)

* Change the chart type to **Table**
* Search for the **user_agent.os.name** and drag it over to the **Columns** field

![image](https://user-images.githubusercontent.com/100947826/192608427-639378b7-6d3b-4bd2-8a26-b6f3593e9271.png)

:cake: We now have a quick report that shows us a breakdown by device of the top URL paths being served up by the application

# One Last Thing
It's time to tie in one last piece, [correlating the logs to the traces](correlating-logs.md). By getting this setup, we are at full observability power...when there are alerts telling us our metrics or traces are going haywire, we can jump from viewing that information to the relevant logs to help debug the issue.
