import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "../_components/Overview";
import { RecentTransactions } from "../_components/RecentTransactions";
import { Expenses } from "../_components/Expenses";
import { Incomes } from "../_components/Incomes";
import { Budgets } from "../_components/Budgets";
import NetWorthChart from "../_components/NetWorthChart";

// Define the ChartsWorkflow component
function ChartsWorkflow() {
  // create function to add two number  
  
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
      {/* Overview Card */}
      <Card className="col-span-12 lg:col-span-7">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      {/* Recent Transactions Card */}
      <Card className="col-span-12 lg:col-span-5">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            You made 265 transactions this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentTransactions />
        </CardContent>
      </Card>
      {/* Expenses Card */}
      <Card className="col-span-12 lg:col-span-6">
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Expenses />
        </CardContent>
      </Card>
      {/* Incomes Card */}
      <Card className="col-span-12 lg:col-span-6">
        <CardHeader>
          <CardTitle>Incomes</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Incomes />
        </CardContent>
      </Card>
      {/* Budgets Card */}
      <Card className="col-span-12 lg:col-span-5">
        <CardHeader>
          <CardTitle>Budget Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Budgets />
        </CardContent>
      </Card>
      {/* Net Worth Card */}
      <Card className="col-span-12 lg:col-span-7">
        <CardHeader>
          <CardTitle>Net Worth</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <NetWorthChart />
        </CardContent>
      </Card>
    </div>
  );
}

export default ChartsWorkflow;
